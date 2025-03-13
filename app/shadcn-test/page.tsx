"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// 역할 타입 정의
type Role = "admin" | "user" | "guest";

export default function ShadcnTestPage() {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as Role | "",
  });

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("제출된 데이터:", formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Shadcn UI 테스트 페이지</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">역할</Label>
          <Select
            value={formData.role}
            onValueChange={(value: Role) =>
              setFormData({ ...formData, role: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="역할을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">관리자</SelectItem>
              <SelectItem value="user">일반 사용자</SelectItem>
              <SelectItem value="guest">게스트</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <Button type="submit" className="w-full">
          제출하기
        </Button>
      </form>
    </div>
  );
}
