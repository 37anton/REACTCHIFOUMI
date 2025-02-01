import Modal from "../components/Modal";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Bienvenue sur Chi Fou Mi</h1>
      <Modal message="Test ouverture de modal avec component Modal" buttonText="Test modal" />
    </div>
  );
};

export default HomePage;
