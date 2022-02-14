import 'pages/crowdfund/index.scss';

import m from 'mithril';
// import app from 'state';
import { AddressInfo } from 'models';
import SearchBar from '../../components/search_bar';
import { ButtonIntent, CWButton } from '../../components/component_kit/buttons';
import ProjectCard, { ProjectCardSize } from './project_card';
import Sublayout from '../../sublayout';
import { Address } from 'ethereumjs-util';

type ProjectProgress = {
  inBlocks: number;
  asPercent: number;
}

type ProjectDeadline = {
  inBlocks: number;
  asPercent: number;
}

type ProjectFunds = {
  inTokens: number;
  inDollars: number;
}

export type Project = {
  name: string;
  author: AddressInfo;
  backers: AddressInfo[];
  description: string;
  shortDescription?: string;
  progress: ProjectProgress;
  deadline: ProjectDeadline;
  threshold: ProjectFunds;
  raised: ProjectFunds;
}

interface ProjectListingAttrs {
  project; // : Project;
}

interface ProjectListingState {
}

const ProjectListing: m.Component<ProjectListingAttrs, ProjectListingState> = {
  view: (vnode) => {
    // const projects = (app.chain as any).projects;
    const userCreatedProjects: Project[] = [ null, null ]; // projects.filter(...)
    const userBackedProjects: Project[] = [ null, null, null, null ]; // projects.filter(...)
    const userPreviouslyBackedProjects: Project[] = [ null, null, null, null, null, null ]; // projects.filter(...)
    const trendingProjects: Project[] = [ null, null ]; // projects.filter(...)
    const recommendedProjects: Project[] = [ null, null, null, null ]; // projects.filter(...)
    return m(Sublayout, {
      class: 'ProjectListing',
      title: 'Projects',
      showNewProposalButton: false,
    }, [
      (userCreatedProjects.length || userBackedProjects.length || userPreviouslyBackedProjects.length) &&
      m('.user-projects', [
        userCreatedProjects.length
        && m('.user-created-project-wrap', [
          m('.user-created-project-header', [
            m('h1', 'Your Projects'),
            m(CWButton, {
              intent: ButtonIntent.Primary,
              label: 'Create New Project',
              onclick: () => true, // m.route.set(`${app.activeId()}/createProject`)
            }),
          ]),
          m('.user-created-projects', userCreatedProjects.map((project) => {
              return m(ProjectCard, { project, size: ProjectCardSize.Large })
           })
          ),
        ]),
        m('.user-backed-project-wrap', [
          m('h2', 'Currently Backing'),
          m('.user-backed-projects', userBackedProjects.map((project) => {
              return m(ProjectCard, { project, size: ProjectCardSize.Medium })
           })
          ),
        ]),
        m('.user-previously-backed-project-wrap', [
          m('h3', 'Past Contributions'),
          m('.user-previously-backed-projects', userPreviouslyBackedProjects.map((project) => {
            return m(ProjectCard, { project, size: ProjectCardSize.Small })
           })
          ),
        ])
      ]),
      (trendingProjects.length || recommendedProjects.length)
      && m('.community-projects', [
        m('h1', 'Discover'),
        m('.project-discovery', [
          m('.trending-projects', [
            m('h2', 'Trending'),
            trendingProjects.map((project) => {
              return m(ProjectCard, { project, size: ProjectCardSize.Large })
            })
          ]),
          m('.recommended-projects', [
            m('h2', 'Recommended'),
            recommendedProjects.map((project) => {
              return m(ProjectCard, { project, size: ProjectCardSize.Medium })
            })
          ]),
        ]),
        // TODO: ModularizeSearch
        m(SearchBar)
      ])
    ])
  }
}

export default ProjectListing;