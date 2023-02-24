// import Link from "next/link";
// import React from "react";
// import styled from "styled-components";
// import { useTypedSelector } from "../../store";

// const MyProfile = () => {
//   const profile = useTypedSelector((state) => state.authSlice.userProfile);

//   return (
//     <StyledProfile>
//       <div className="page-content page-container mt-5 mb-3" id="page-content">
//         <div className="padding">
//           <div className="row container d-flex justify-content-center mx-auto">
//             <div className="col-lg-5 col-md-7">
//               <div className="card">
//                 <div className="card-body text-center">
//                   <div>
//                     <img src={profile.image} style={{ maxWidth: "320px" }} />
//                     <h4>{profile.nickname}</h4>
//                     <p>
//                       <button
//                         v-if="isAuthorized && isAuthor"
//                         type="button"
//                         className={`btn btn-dark
//                         `}
//                         onClick={() => {}}
//                       >
//                         로그아웃 하기
//                       </button>
//                     </p>
//                   </div>

//                   <div className="border-top pt-3">
//                     <div className="row">
//                       <div className="col-4">
//                         <h6>{myPosts.length}</h6>
//                         <p>Post</p>
//                       </div>
//                       <div
//                         className="col-4"
//                         data-bs-toggle="modal"
//                         data-bs-target="#exampleModal"
//                       >
//                         <h6>{profile.followers.length}</h6>
//                         <p>Followers</p>
//                       </div>

//                       <div
//                         className="modal fade"
//                         id="exampleModal"
//                         tabIndex={-1}
//                         aria-labelledby="exampleModalLabel"
//                         aria-hidden="true"
//                       >
//                         <div className="modal-dialog modal-dialog-scrollable">
//                           <div className="modal-content">
//                             <div className="modal-header">
//                               <h5
//                                 className="modal-title text-dark"
//                                 id="exampleModalLabel"
//                               >
//                                 나의 팔로워
//                               </h5>
//                               <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                               ></button>
//                             </div>
//                             <div className="modal-body text-dark">
//                               {profile.followers.map((follower) => {
//                                 console.log(follower);
//                                 return (
//                                   <div
//                                     key={follower.uid + "follower"}
//                                     data-bs-dismiss="modal"
//                                     aria-label="Close"
//                                   >
//                                     <Link
//                                       className="text-dark"
//                                       key={follower.uid}
//                                       href="/profile/[uid]"
//                                       as={`/profile`}
//                                     >
//                                       <img
//                                         src={follower.image}
//                                         style={{ height: "64px" }}
//                                       />
//                                       <span>{follower.nickname}</span>
//                                     </Link>
//                                     <hr />
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         className="col-4"
//                         data-bs-toggle="modal"
//                         data-bs-target="#followingModal"
//                       >
//                         <h6>{profile.followings.length}</h6>
//                         <p>Followings</p>
//                       </div>

//                       <div
//                         className="modal fade"
//                         id="followingModal"
//                         tabIndex={-1}
//                         aria-labelledby="followingModalLabel"
//                         aria-hidden="true"
//                       >
//                         <div className="modal-dialog modal-dialog-scrollable">
//                           <div className="modal-content">
//                             <div className="modal-header">
//                               <h5
//                                 className="modal-title text-dark"
//                                 id="followingModalLabel"
//                               >
//                                 나의 팔로잉
//                               </h5>
//                               <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                               ></button>
//                             </div>
//                             <div className="modal-body text-dark">
//                               {profile.followings.map((follwing) => {
//                                 return (
//                                   <div
//                                     key={follwing.uid + "following"}
//                                     data-bs-dismiss="modal"
//                                     aria-label="Close"
//                                   >
//                                     <Link
//                                       className="text-dark"
//                                       key={follwing.uid}
//                                       href="/profile/[uid]"
//                                       as={`/profile`}
//                                     >
//                                       <img
//                                         src={follwing.image}
//                                         style={{ height: "64px" }}
//                                       />
//                                       <span>{follwing.nickname}</span>
//                                     </Link>
//                                     <hr />
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </StyledProfile>
//   );
// };

// export default MyProfile;

// const StyledProfile = styled.div`
//   .stretch-card > .card {
//     width: 100%;
//     min-width: 100%;
//   }

//   .card {
//     color: #fff;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     min-width: 0;
//     word-wrap: break-word;
//     background-color: rgba(0, 0, 0, 0.397);
//     background-clip: border-box;
//     border: 1px solid rgba(20, 20, 20, 0.438);
//     border-radius: 10px;
//   }

//   .btn-info {
//     color: #fff;
//     background-color: #f48f3d;
//     border-color: #f48f3d;
//   }

//   .btn {
//     font-size: 0.875rem;
//     line-height: 1;
//     font-weight: 400;
//     padding: 0.7rem 1.5rem;
//     border-radius: 0.1275rem;
//   }

//   h6 {
//     font-size: 0.9375rem;
//   }
// `;
