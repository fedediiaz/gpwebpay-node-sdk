import { DEFAULT_GATEWAY, createConfig } from "@tests/helpers/config";
import { describe, expect, it } from "vitest";
import { SignerFactory } from "../../src/Signer/SignerFactory";
import { SignerProvider } from "../../src/Signer/SignerProvider";

describe("SignerProvider", () => {
	it("should return default provider if no params pass", () => {
		const config = createConfig().getSignerConfigProvider();
		const provider = new SignerProvider(new SignerFactory(), config);

		const signerNoParams = provider.get();
		const signerDefault = provider.get(DEFAULT_GATEWAY);

		expect(signerNoParams).toBe(signerDefault);
	});

	it("creates different signers for different currencies", () => {
		const config = createConfig().getSignerConfigProvider();
		const provider = new SignerProvider(new SignerFactory(), config);

		const signerCzk = provider.get("czk");
		const signerEur = provider.get("eur");

		expect(signerCzk).not.toBe(signerEur);
	});

	it("reuses the same signer for the same currency", () => {
		const config = createConfig().getSignerConfigProvider();
		const provider = new SignerProvider(new SignerFactory(), config);

		const signer1 = provider.get("czk");
		const signer2 = provider.get("czk");

		expect(signer1).toBe(signer2);
	});
});
