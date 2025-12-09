export class OptionModel {
  constructor() {
    this.optionId = 0;
    this.option = "";
    this.rating = 0;
    this.isSelected = false; // same as MAUI
  }
}

export class Question {
  constructor() {
    this.qno = 0;
    this.text = "";
    this.options = [];      // list of OptionModel
    this.selectedOptionId = null;
  }
}

export class SurveyQuestionSet {
  constructor() {
    this.id = "";
    this.surveyId = "";
    this.questions = [];   // list of Question
  }
}
