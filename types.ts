
export interface Message {
  role: 'user' | 'model';
  text: string;
  citations?: { uri: string; title: string }[];
}

export enum SiebelSection {
  ARCHITECTURE = 'architecture',
  CONFIG = 'config',
  SCRIPTING = 'scripting',
  WORKFLOW = 'workflows',
  EXPERT = 'expert',
  XML_SHOWCASE = 'xml-showcase',
  OPEN_UI = 'open-ui'
}

export enum SiebelFileType {
  BC = 'Business Component',
  WF = 'Workflow',
  SCRIPT = 'eScript',
  UI = 'UI Layer',
  INTEGRATION = 'Integration',
  DOC = 'Documentation',
  JS = 'JavaScript',
  CSS = 'CSS',
  SCSS = 'SCSS'
}

export interface ConfigExample {
  id: string;
  title: string;
  type: 'Applet' | 'View' | 'Business Service';
  description: string;
  xml: string;
}

export interface OpenUIFile {
  name: string;
  code: string;
  language: 'javascript' | 'css' | 'xml' | 'scss';
}

export interface OpenUIExample {
  id: string;
  title: string;
  type: 'Physical Model' | 'Presentation Renderer' | 'CSS/SCSS' | 'Manifest';
  description: string;
  files: OpenUIFile[];
}

export interface ArchLayer {
  id: string;
  name: string;
  description: string;
  examples: string[];
  color: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  icon: string;
  description: string;
  usage: string;
}

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  config: Record<string, any>;
}

export interface WorkflowLink {
  from: string;
  to: string;
  label?: string;
}

export interface WorkflowDesign {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  links: WorkflowLink[];
  lastModified: number;
}
