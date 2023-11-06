// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_RATING } from '../utils/queries';

// export default function Rating () {
//   const { ratingId } = useParams();

//   const { loading, data } = useQuery(QUERY_RATING, {
//     variables: { ratingId: ratingId },
//   });

//   const rating = data?.rating || {};

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="my-3">
//       <h3 className="card-header bg-dark text-light p-2 m-0">
//         {rating.user} <br />
//         <span style={{ fontSize: '1rem' }}>
//           posted this rating on {rating.createdAt}
//         </span>
//       </h3>
//       <div className="bg-light py-4">
//         <blockquote
//           className="p-4"
//           style={{
//             fontSize: '1.5rem',
//             fontStyle: 'italic',
//             border: '2px dotted #1a1a1a',
//             lineHeight: '1.5',
//           }}
//         >
//           {rating.value}
//         </blockquote>
//       </div>
//     </div>
//   );
// };
