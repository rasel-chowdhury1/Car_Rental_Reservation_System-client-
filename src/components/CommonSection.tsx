
const CommonSection = ({title}: {title:string}) => {
    return (
        <section className="bg-custom-gradient bg-center bg-cover bg-no-repeat py-20">
            <div className="text-center">
                <h1 className="text-2xl text-white sm:text-lg font-bold">{title}</h1>
            </div>
       </section>
    );
};

export default CommonSection;