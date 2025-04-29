export const getProduct = async (token: string, productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('상품 정보 조회 실패');
  }

  const data = await response.json();

  return { data };
};

export const getMineProduct = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/mine`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('내 상품 정보 조회 실패');
  }

  const data = await response.json();

  return { data };
};

export const postProduct = async ({ token, body }: { token: string; body: FormData }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error('상품 등록 실패');
  }

  const data = await response.json();

  return { data };
};

export const patchProduct = async ({
  token,
  body,
  productId,
}: {
  token: string;
  body: FormData;
  productId: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error('상품 수정 실패');
  }

  const data = await response.json();

  return { data };
};

export const deleteProduct = async (token: string, productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('상품 삭제 실패');
  }

  const data = await response.json();

  return { data };
};
