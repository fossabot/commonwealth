/* @jsx m */

import m, { Vnode } from 'mithril';
import 'components/component_kit/cw_table.scss';
import { CWText } from './cw_text';

export type ButtonAttrs = {
  className?: string;
  tableName?: string;
  headers: string[] | Vnode<never>[];
  entries: Vnode<never>[][];
};

// TODO Graham 5-16-22: Only styled for simple two-column table; needs extending
// Eventually should have filtering/sorting functionality added
export class CWTable implements m.ClassComponent<ButtonAttrs> {
  view(vnode) {
    const { className, tableName, headers, entries } = vnode.attrs;
    return (
      <div class={`${className || ''} Table`}>
        <CWText type="h1">{tableName}</CWText>
        <table>
          <tr>
            {headers.map((headerText: string) => (
              <th>
                <CWText type="body1" fontWeight="medium">
                  {headerText}
                </CWText>
              </th>
            ))}
          </tr>
          {entries.map((row) => {
            return (
              <tr>
                {row.map((cellText: string) => {
                  return (
                    <td>
                      <CWText type="body1">{cellText}</CWText>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
