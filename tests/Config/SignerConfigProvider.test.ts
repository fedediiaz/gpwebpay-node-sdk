import { privateKeyPath, publicKeyPath } from "@tests/helpers/keys";
import { describe, expect, it } from "vitest";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { SignerConfig } from "@/Config/SignerConfig";
import { SignerConfigProvider } from "@/Config/SignerConfigProvider";

describe("SignerConfigProvider", () => {
	it("should add and retrieve config correctly", () => {
		const provider = new SignerConfigProvider();
		const config = new SignerConfig(privateKeyPath, "1234567", publicKeyPath);

		provider.addConfig(config, "czk");
		provider.setDefaultGateway("czk");

		expect(provider.getConfig("czk")).toBe(config);
		expect(provider.getConfig()).toBe(config);
	});

	it("should add default config and retrieve it without specifying gateway", () => {
		const provider = new SignerConfigProvider();
		const config = new SignerConfig(privateKeyPath, "1234567", publicKeyPath);

		provider.addConfig(config, provider.getDefaultGateway());

		expect(provider.getConfig()).toBe(config);
	});

	it("should throw if config is missing for given gateway", () => {
		const provider = new SignerConfigProvider();

		expect(() => provider.getConfig("czk")).toThrowError(
			new InvalidArgumentException(
				'Config for gateway "czk" does not exist. You probably forgot to add it or set the default config incorrectly.',
			),
		);
	});
});
