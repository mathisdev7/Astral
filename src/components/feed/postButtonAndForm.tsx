import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { Textarea } from "../ui/textarea";

export default function PostButtonAndForm() {
  const [isCreatingTweet, setIsCreatingTweet] = React.useState(false);
  const [astralData, setAstralData] = React.useState({
    title: "",
    text: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAstralData({
      ...astralData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAstral = () => {
    setIsCreatingTweet(false);
    fetch("/api/astral/create", {
      method: "POST",
      body: JSON.stringify(astralData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="absolute bottom-4 right-4">
        <Dialog>
          {isCreatingTweet && (
            <React.Fragment>
              <DialogContent className="sm:max-w-[425px] dark:bg-[#000] bg-[#eee]">
                <DialogHeader>
                  <DialogTitle className="dark:text-white text-black">
                    Create an Astral
                  </DialogTitle>
                  <DialogDescription>
                    Share your thoughts with the world.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 items-center justify-center">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="title"
                      className="text-right dark:text-white text-black"
                    >
                      Title
                    </Label>
                    <Input
                      id="title"
                      onChange={(e) => handleChange(e)}
                      name="title"
                      required
                      value={astralData.title}
                      className="col-span-3 dark:text-white text-black"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="description"
                      className="text-right dark:text-white text-black"
                    >
                      Description
                    </Label>
                    <Textarea
                      onChange={(e) => handleChange(e)}
                      id="description"
                      name="text"
                      required
                      value={astralData.text}
                      className="col-span-3 dark:text-white text-black"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="image"
                      className="text-right dark:text-white text-black"
                    >
                      Image
                    </Label>
                    <Input
                      id="image"
                      onChange={(e) => handleChange(e)}
                      name="image"
                      value={astralData.image}
                      type="file"
                      accept="image/*"
                      placeholder="Choose an image file"
                      className="col-span-3 dark:text-white text-black border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="dark:text-black text-white dark:bg-[#eee] bg-[#000] hover:bg-[#ccc] mx-auto block"
                    onClick={handleCreateAstral}
                  >
                    Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </React.Fragment>
          )}
          <DialogTrigger
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-3xl"
            onClick={() => setIsCreatingTweet(true)}
          >
            <span className="relative bottom-px">+</span>
          </DialogTrigger>
        </Dialog>
      </div>
    </>
  );
}
