import React from 'react';
import { ICourse } from '../../Data/Interface';

import "./Participants.css"

interface ParticipantsProps {
  course: ICourse;
}

export function Participants({ course }: ParticipantsProps) {
  return (
    <div className="card participants">
      <h3>Participants</h3>
      <p>{course.CourseName}</p>
      {/* Add logic for displaying participants */}
      <p>45 students enrolled</p>
    </div>
  );
}