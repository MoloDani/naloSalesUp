import { useEffect } from "react";

const CalendlyWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget -ml-4 lg:-my-[4rem]"
      data-url="https://calendly.com/nalovisuals/nalo"
      style={{ width: "80vw", height: "700px" }}
    ></div>
  );
};

export default CalendlyWidget;
