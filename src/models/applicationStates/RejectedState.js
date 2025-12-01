// RejectedState: application has been rejected

import { ApplicationState } from './ApplicationState.js';

export class RejectedState extends ApplicationState {
  getStatus() {
    return 'Rejected';
  }

  approve() {
    console.log('Cannot approve a rejected application.');
  }

  reject() {
    console.log('Application already rejected.');
  }
}
