// PendingState: concrete state for pending applications

import { ApplicationState } from './ApplicationState.js';
import { ApprovedState } from './ApprovedState.js';
import { RejectedState } from './RejectedState.js';

export class PendingState extends ApplicationState {
  getStatus() {
    return 'Pending';
  }

  approve() {
    this.application.changeState(new ApprovedState(this.application));
  }

  reject() {
    this.application.changeState(new RejectedState(this.application));
  }
}
