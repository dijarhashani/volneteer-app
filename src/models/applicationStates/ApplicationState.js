// State base class for Application (State pattern)

export class ApplicationState {
  constructor(application) {
    this.application = application;
  }

  getStatus() {
    return 'Unknown';
  }

  approve() {
    console.log('Cannot approve from this state.');
  }

  reject() {
    console.log('Cannot reject from this state.');
  }
}
