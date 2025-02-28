import './loader.css';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <svg className="w-full h-full">
        <text
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          className="text-neon animate-stroke"
        >
          Porbo Shobai
        </text>
      </svg>
    </div>
  );
};

export default Loader;
