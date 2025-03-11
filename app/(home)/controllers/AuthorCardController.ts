import { useState } from "react";

export function useAuthorCardController() {
  const [isLiked, setIsLiked] = useState(false);

  const onClickHeart = () => {
    setIsLiked(!isLiked);
  };

  return { isLiked, onClickHeart };
}
