import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function ProfileField({
	title,
	data,
	type,
}: {
	title: string;
	data: string;
	type?: string;
}) {
	return (
		<FieldGroup>
			<Field>
				<FieldLabel
					className="mb-0"
					htmlFor="checkout-7j9-card-name-43j"
				>
					{title}
				</FieldLabel>
				<Input
					id="checkout-7j9-card-name-43j"
					type={type}
					value={data}
					disabled
				/>
			</Field>
		</FieldGroup>
	);
}

export default ProfileField;
