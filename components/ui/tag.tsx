export default function Tag( {values} : {values : string[]}) {
    return (
        <div className="w-fit">
            {values?.map((value) => (
                <span className="text-wrap rounded-lg bg-slate-100 m-2 p-2" key={value}>
                    {value}
                </span>
            ))}
        </div>
    )
}