import { getImage } from "../../services/image";

function Image() {
  const [image, setImage] = useState(null);
  return (
      <>
        <img src={'https://bdcdxgfcvjlngohpasik.supabase.co/storage/v1/object/public/image/test.JPG'} />
      </>

  )
}

export default Image;

{/* <button
onClick={() => {

}}
>
Get Image
</button> */}