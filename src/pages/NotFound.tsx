import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#0d0d0d] px-4">
      <div className="text-center text-white">
        <h1 className="text-6xl font-black text-primary">404</h1>
        <p className="text-xl text-white/80 mt-4">Página não encontrada.</p>
        <Link
          to="/"
          className="inline-block mt-6 text-primary font-bold hover:underline uppercase text-sm"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
