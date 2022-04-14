export default function Header({ text } : { text: string }) {
  return (
    <div className="flex items-center mx-auto w-fit h-36">
      <p className="text-2xl h-fit font-extrabold tracking-wide">
        {text}
      </p>
    </div>
  )
}