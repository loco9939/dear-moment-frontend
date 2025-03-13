import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
	active?: boolean;
	background?:'default'|'inverse'
}

/**
 * Chip 컴포넌트
 * @param label 칩에 표시될 텍스트
 * @param active 활성화 여부 (ChevronDown 아이콘 표시)
 * @param background 배경 스타일 ('default' | 'inverse')
 */
export const Chip = ({
  className,
	label,
	active = false,
	background = 'default',
  ...props
}: ChipProps) => {
	const isInverse = background === 'inverse'
	
	const styles = {
		container: cn(
			'rounded-[10rem] px-[1.2rem] py-[1rem] flex items-center gap-[0.4rem]',
			isInverse
				? 'bg-gray-95 text-common-0'
				: 'border border-gray-50 text-common-100 bg-common-0',
			className
		),
		label: cn(
			'text-body3Normal whitespace-nowrap', 
			isInverse ? 'font-semibold' : 'font-regular'
		),
	};

	return <div role="button" className={styles.container} {...props}>
		<span className={styles.label}>{label}</span>
		{active && <ChevronDown width={14} height={14} />}
	</div>;
};

