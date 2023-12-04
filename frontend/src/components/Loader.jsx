export default function Loader({ message }) {
  return (
    <div className="w-full h-screen bg-dark-3 p-2">
      <section className="mt-20">
        <div className="mx-auto w-20 h-20 my-10 rounded-full border-2 border-t-dark-2 animate-spin"></div>
        <div className="mx-auto text-light-1 text-center text-xl ">
          {message}
        </div>
      </section>
    </div>
  );
}
