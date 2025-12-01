// ApprovedState: application already approved

import { ApplicationState } from './ApplicationState.js';

export class ApprovedState extends ApplicationState {
  getStatus() {
    return 'Approved';
  }

  approve() {
    console.log('Application already approved.');
  }

  reject() {
    console.log('Cannot reject an approved application.');
  }
}
