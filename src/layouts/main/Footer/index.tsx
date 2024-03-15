const DefaultFooter = () => {
  return (
    <div className="w-full border-t">
      <div className="container py-8">
        <div className="flex justify-center items-center py-5">
          (C) {new Date().getFullYear()} All right reserved.
        </div>
      </div>
    </div>
  );
};
export default DefaultFooter;
