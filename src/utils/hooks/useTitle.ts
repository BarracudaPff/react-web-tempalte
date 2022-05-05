import {useEffect} from "react"

export default function(title: string) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title
        return () => {
            document.title = prevTitle
        }
    })
}
