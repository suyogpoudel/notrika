import Link from "next/link";
import {Button} from "@/components/ui/button";


const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-2">Welcome to <span
                className="text-3xl text-primary"
            >Notrika</span>!

            </h1>
            <p className="text-lg text-muted-foreground mb-4">Create notes and share them with other people</p>

            <Button asChild size="lg">
                <Link href='/notes'>Create Notes</Link>
            </Button>

        </div>
    )
}
export default Home
