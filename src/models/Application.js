// Application model (UML: Application + State pattern integration)

import { PendingState } from './applicationStates/PendingState.js';
import { ApprovedState } from './applicationStates/ApprovedState.js';
import { RejectedState } from './applicationStates/RejectedState.js';

export class Application {
  constructor(applicationId, volunteerId, opportunityId, status = 'Pending', submissionDate = new Date()) {
    this.applicationId = applicationId;
    this.volunteerId = volunteerId;
    this.opportunityId = opportunityId;
    this.submissionDate = submissionDate;

    this.state = null;
    this._setStateFromStatus(status);
  }

  _setStateFromStatus(status) {
    switch (status) {
      case 'Approved':
        this.state = new ApprovedState(this);
        break;
      case 'Rejected':
        this.state = new RejectedState(this);
        break;
      case 'Pending':
      default:
        this.state = new PendingState(this);
        break;
    }
  }

  changeState(newState) {
    this.state = newState;
  }

  get status() {
    return this.state.getStatus();
  }

  submitApplication() {
    return `Application ${this.applicationId} submitted`;
  }

  approve() {
    this.state.approve();
  }

  reject() {
    this.state.reject();
  }
}
