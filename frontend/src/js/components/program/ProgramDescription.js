import React from 'react';
import styled from 'styled-components';

const ProgramDescription = ({ className, program }) => {
  return (
    <p className={className}>
      {program.description ||
        `Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und
      Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in
      Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein
      kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit
      den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem
      gebratene Satzteile in den Mund fliegen.`}
    </p>
  );
};

export default styled(ProgramDescription)`
  padding: 10px 10px;
`;
