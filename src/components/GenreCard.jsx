const GenreCard = (props) => {
  return (
    <div className="card" onClick={props.onClick}>
      {' '}
      <div className="img-wrapper">
        <img src={props.image} alt={props.name} />{' '}
      </div>
      <div className="info-wrapper flex-col">
        <h3>{props.name}</h3>
        <p>Rating: {props.rating}</p>
      </div>
    </div>
  )
}



//   return (
//     <div className="card" onClick={props.onClick}>
//       <div className="img-wrapper">
//         <img src={props.image} alt={props.name} />
//       </div>
//       <div className="info-wrapper flex-col">
//         <h3>{props.name}</h3>
//         <p>Hello</p>
//         <p>{props.gamesCount} Games</p>
//       </div>
//     </div>
//   )
// }

export default GenreCard
