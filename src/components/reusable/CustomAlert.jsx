export default function CustomAlert(props) {
    return (
      <div className="alert-box">
        <div className="alert-content">
          <h2>{props.alertTitle}</h2>
          <p>{props.message}</p>
          <button onClick={props.onClose}>{props.buttonText}</button>
        </div>
      </div>
    );
  }