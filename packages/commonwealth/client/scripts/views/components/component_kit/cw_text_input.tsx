/* @jsx m */

import m, { VnodeDOM } from 'mithril';

import 'components/component_kit/cw_text_input.scss';

import _ from 'lodash';
import { ComponentType } from './types';
import { getClasses } from './helpers';
import { CWLabel } from './cw_label';
import { ValidationStatus } from './cw_validation_text';
import { CWIcon } from './cw_icons/cw_icon';
import { CWText } from './cw_text';
import { CWIconButton } from './cw_icon_button';

type TextInputSize = 'small' | 'large';

export type InputStyleAttrs = {
  inputClassName?: string;
  darkMode?: boolean;
  disabled?: boolean;
  size: TextInputSize;
  validationStatus?: ValidationStatus;
  displayOnly?: boolean;
};

export type TextInputAttrs = {
  autocomplete?: string;
  autofocus?: boolean;
  containerClassName?: string;
  defaultValue;
  iconRight?: string;
  iconRightonclick?: () => void;
  inputValidationFn?: (value: string) => [ValidationStatus, string];
  label?: string;
  maxlength?: number;
  name: string;
  oninput?: (e) => void;
  onenterkey?: (e) => void;
  onclick?: (e) => void;
  placeholder?: string;
  required?: boolean;
  tabindex?: number;
  validateWhileTyping?: boolean;
  value?: string;
} & InputStyleAttrs;

export type InputInternalStyleAttrs = {
  hasRightIcon?: boolean;
  isTyping: boolean;
};

export type MessageRowAttrs = {
  hasFeedback?: boolean;
  label: string;
  statusMessage?: string;
  validationStatus?: ValidationStatus;
};

export class MessageRow implements m.ClassComponent<MessageRowAttrs> {
  view(vnode) {
    const { hasFeedback, label, statusMessage, validationStatus, displayOnly } =
      vnode.attrs;

    return (
      <div
        class={getClasses<{ hasFeedback: boolean }>(
          { hasFeedback },
          'MessageRow'
        )}
      >
        <CWLabel label={label} />
        {hasFeedback && (
          <CWText
            type="caption"
            className={getClasses<{ status: ValidationStatus }>(
              { status: validationStatus },
              'feedback-message-text'
            )}
          >
            {statusMessage}
          </CWText>
        )}
      </div>
    );
  }
}

export class CWTextInput implements m.ClassComponent<TextInputAttrs> {
  private inputTimeout: NodeJS.Timeout;
  private isTyping: boolean;
  private statusMessage?: string = '';
  private validationStatus?: ValidationStatus = undefined;

  view(vnode: VnodeDOM<TextInputAttrs, this>) {
    const {
      autocomplete = 'off',
      autofocus,
      containerClassName,
      darkMode,
      displayOnly,
      defaultValue,
      disabled,
      iconRight,
      iconRightonclick,
      inputClassName,
      inputValidationFn,
      label,
      maxlength,
      name,
      oninput,
      onenterkey,
      onclick,
      placeholder,
      required,
      size = 'large',
      tabindex,
      value,
    } = vnode.attrs;

    const validateWhileTyping = vnode.attrs.validateWhileTyping ?? true;

    return (
      <div
        class={getClasses<{
          containerClassName?: string;
          validationStatus?: ValidationStatus;
        }>(
          {
            containerClassName,
            validationStatus: this.validationStatus,
          },
          ComponentType.TextInput
        )}
        onclick={onclick}
      >
        {label && (
          <MessageRow
            hasFeedback={!!inputValidationFn}
            label={label}
            statusMessage={this.statusMessage}
            validationStatus={this.validationStatus}
          />
        )}
        <div class="input-and-icon-container">
          <input
            autofocus={autofocus}
            autocomplete={autocomplete}
            class={getClasses<InputStyleAttrs & InputInternalStyleAttrs>({
              size,
              validationStatus: this.validationStatus,
              disabled,
              displayOnly,
              isTyping: this.isTyping,
              hasRightIcon: !!iconRight,
              darkMode,
              inputClassName,
            })}
            defaultValue={defaultValue}
            disabled={disabled || displayOnly}
            tabindex={tabindex}
            maxlength={maxlength}
            name={name}
            placeholder={placeholder}
            required={required}
            oninput={(e) => {
              _.debounce(() => {
                if (oninput) oninput(e);
              }, 250)();

              const inputLength = e.target.value?.length;
              if (inputLength === 0) {
                this.isTyping = false;
                this.validationStatus = undefined;
                this.statusMessage = undefined;
                m.redraw();
              } else {
                e.stopPropagation();
                this.isTyping = true;
                clearTimeout(this.inputTimeout);
                const timeout = inputLength > 3 ? 250 : 1000;
                this.inputTimeout = setTimeout(() => {
                  this.isTyping = false;
                  if (
                    inputValidationFn &&
                    validateWhileTyping &&
                    inputLength > 0
                  ) {
                    [this.validationStatus, this.statusMessage] =
                      inputValidationFn(e.target.value);
                    m.redraw();
                  }
                }, timeout);
              }
            }}
            onfocusout={(e) => {
              if (inputValidationFn) {
                if (e.target.value?.length === 0) {
                  this.isTyping = false;
                  this.validationStatus = undefined;
                  this.statusMessage = undefined;
                  m.redraw();
                } else {
                  [this.validationStatus, this.statusMessage] =
                    inputValidationFn(e.target.value);
                }
              }
            }}
            onkeydown={(e) => {
              if (onenterkey && (e.key === 'Enter' || e.keyCode === 13)) {
                onenterkey(e);
              }
            }}
            value={value}
          />
          {iconRightonclick && !!iconRight && !disabled ? (
            <div class="text-input-right-onclick-icon">
              <CWIconButton
                iconName={iconRight}
                iconSize="small"
                onclick={iconRightonclick}
                theme="primary"
              />
            </div>
          ) : !!iconRight && !disabled ? (
            <CWIcon
              iconName={iconRight}
              iconSize="small"
              className="text-input-right-icon"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
