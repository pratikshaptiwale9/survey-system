export class SurveyAnswer {
  constructor() {
    this.questionId = 0;
    this.optionId = 0;
    this.option = "";
  }
}

export class GeoLocation {
  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
}

export class SurveyResponse {
  constructor() {
    this.id = crypto.randomUUID();

    this.survey_id = "";
    this.cycle_id = "";
    this.surveyor_id = "";
    this.participant_id = "";

    this.answers = [];   // List of SurveyAnswer
    this.location = null; // GeoLocation object
    this.timestamp = new Date().toISOString();
  }
}
