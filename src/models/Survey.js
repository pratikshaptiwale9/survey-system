export class Survey {
  constructor() {
    this.id = "";
    this.title = "";
    this.createdBy = "";
    this.createdAt = "";
    this.currentParticipants = 0;
    this.targetParticipants = 0;
    this.isCompleted = false;

    // Calculated values (same behavior as MAUI)
    this.participantInfo = "";
    this.status = "";
    this.statusColor = "";
    this.actionText = "";
    this.actionColor = "";
    this.actionTextColor = "";
  }

  updateComputedFields() {
    this.participantInfo =
      `${this.currentParticipants}/${this.targetParticipants} Participants`;

    this.status = this.isCompleted ? "Completed" : "In progress";

    this.statusColor = this.isCompleted ? "#388e3c" : "#fbc02d";
    this.actionText = this.isCompleted ? "View Results" : "Take Survey";

    this.actionColor = this.isCompleted ? "#e0e0e0" : "#4285f4";
    this.actionTextColor = this.isCompleted ? "#1E1E1E" : "#FFFFFF";
  }
}
