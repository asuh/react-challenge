import type React from 'react';
import './SkeletonDetails.css';

const SkeletonDetails: React.FC = () => (
  <div className='skeleton-details'>
    <h2 className='skeleton-heading skeleton-animate visually-hidden'>Skeleton Page for Loading</h2>
    <table className='pokemon-details-table'>
      <caption className='visually-hidden'>Loading Abilities</caption>
      <thead>
        <tr>
          <th scope='col'>Ability</th>
          <th scope='col'>Ability Effect</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map((i) => (
          <tr key={i}>
            <td><div className='skeleton-table-cell skeleton-animate' /></td>
            <td><div className='skeleton-table-cell skeleton-animate' /></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='skeleton-back skeleton-animate' />
  </div>
);

export default SkeletonDetails;
