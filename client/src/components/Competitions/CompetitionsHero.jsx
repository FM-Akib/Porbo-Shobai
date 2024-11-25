import { Button } from "../ui/button";


const CompetitionsHero = () => {
    return (

        <section>
                <div className="relative max-w-7xl mx-auto px-6 py-4 lg:py-20 ">
                    <div className="lg:flex lg:items-center lg:gap-12">
                        <div className="relative z-10 text-center max-w-2xl mx-auto lg:ml-0 lg:text-left lg:w-1/2">
                            <h1 className="mt-3 text-title font-bold text-balance text-4xl md:text-5xl xl:text-5xl">Grab The Opportunities and Unlock Your Potential</h1>
                            <p className="mt-8 text-body text-justify">Oppertunities are rare, seize them.Each step you take opens doors to growth and success. Embrace them with confidence and let your dreams take flight.</p>
                            <div>
                                <ul className="mt-2 list-inside list-disc flex gap-2 justify-center items-start flex-col">
                                    <li>Hackhathons</li>
                                    <li>Quizzes</li>
                                    <li>Webinar and others competitions</li>
                                </ul>
                            </div>
                            <div className="flex gap-4 mt-8 flex-wrap justify-center lg:justify-start items-center">
                                <Button className="bg-green-500 py-6 shadow-md  rounded-3xl dark:text-white text-lg">Find Competitions</Button>
                                <Button variant="secondary" className=" py-6 shadow-md rounded-3xl text-lg">Host Competitions</Button>
                            </div>
                        </div>
                        <div className="relative lg:absolute inset-x-0 right-6 mt-12 lg:mt-0 lg:inset-y-16 h-fit mx-auto lg:mr-0 ml-auto max-w-md [--ui-shadow-border:var(--ui-border-color)]">      
                        <img src="https://res.cloudinary.com/dzghnopbp/image/upload/v1732540172/twb0q8ttaycffmjktazp.png" alt="project illustration" height="" width="" />
                        </div>
                    </div>
                </div>
        </section>

    );
};

export default CompetitionsHero;