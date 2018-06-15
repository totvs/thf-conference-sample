export interface Lecture {
  /**
   * Lecture id.
   */
  id?: string;
  /**
   * Lecture title.
   */
  title: string;
  /**
   * Lecture description.
   */
  description: string;
  /**
   * Lecture room.
   */
  room: string;
  /**
   * Lecture start.
   */
  startTime: string;
  /**
   * Lecture end.
   */
  endTime: string;
  /**
   * Lecture track.
   */
  trackId: string;
  /**
   * Speaker id.
   */
  speakerId: string;
}
