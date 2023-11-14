import { useRouter } from "next/router";
import { useState } from "react";
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>Fatura {id}</div>
    </>
  );
};

export default index;
