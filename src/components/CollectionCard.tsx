interface CollectionCardProps {
  imgUrl: string
  title: string
  value: string
}

export default function CollectionCard({
  imgUrl,
  title,
  value,
}: CollectionCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start px-3 md:pr-10 py-2 w-fit bg-white rounded-md gap-2 sm:gap-4 ">
      <div className=" max-w-[40px] md:w-full rounded-full flex justify-center items-center p-2 bg-black">
        <img className="" src={imgUrl} alt="Svg icon" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold text-sm text-center sm:text-start overflow-hidden">
          {title}
        </span>
        <span className="font-normal text-2xl text-wrap text-center sm:text-start truncate overflow-hidden">
          {value}
        </span>
      </div>
    </div>
  )
}
