import type { SwiperItem } from "../../types/swiper"

const ImageCont = (props:SwiperItem) => {
    const {id,name, url} = props

  return (
    <div key={id} aria-label={name} className="rounded-lg border-gray-200 py-5">
      <img className="object-contain md:object-cover rounded-lg responsive-img" alt={name} src={url}/>
    </div>
  )
}

export default ImageCont
