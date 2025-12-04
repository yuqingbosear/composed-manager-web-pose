export interface Workflow {
  id: string;
  name: string;
  description?: string;
}

export interface WorkflowCreate {
  name: string;
  description?: string;
}