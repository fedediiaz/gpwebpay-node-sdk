import { describe, expect, it } from "vitest";
import { Currency as CurrencyEnum } from "@/Enum/Currency";
import { DepositFlag as DepositFlagEnum } from "@/Enum/DepositFlag";
import { Param } from "@/Enum/Param";
import { PayMethod as PayMethodEnum } from "@/Enum/PayMethod";
import { AmountInPennies } from "@/Param/AmountInPennies";
import { Currency } from "@/Param/Currency";
import { DepositFlag } from "@/Param/DepositFlag";
import { MerchantNumber } from "@/Param/MerchantNumber";
import { OrderNumber } from "@/Param/OrderNumber";
import { PayMethod } from "@/Param/PayMethod";
import { ResponseUrl } from "@/Param/ResponseUrl";
import { Operation } from "@/Data/Operation";
import { Request } from "@/Data/Request";

describe("Request", () => {
	it("should sort parameters in correct order", () => {
		const operation = new Operation(
			new OrderNumber("123456"),
			new AmountInPennies(100000),
			new Currency(CurrencyEnum.CZK),
			"czk",
			new ResponseUrl("http://test.com"),
		);
		const request = new Request(
			operation,
			new MerchantNumber("123456789"),
			new DepositFlag(DepositFlagEnum.YES),
			"https://example.com/sucesss",
		);

		request.setParam(new PayMethod(PayMethodEnum.CARD));
		request.sortParams();

		const expectedOrder = [
			Param.MERCHANTNUMBER,
			Param.OPERATION,
			Param.ORDERNUMBER,
			Param.AMOUNT,
			Param.CURRENCY,
			Param.DEPOSITFLAG,
			Param.RESPONSE_URL,
			Param.MD,
			Param.PAYMETHOD,
		];

		expect(Object.keys(request.getParams())).toEqual(expectedOrder);
	});

	it("should return only the base URL when asPost is true", () => {
		const baseUrl = "https://example.com/process";

		const operation = new Operation(
			new OrderNumber("123456"),
			new AmountInPennies(100000),
			new Currency(CurrencyEnum.CZK),
			"czk",
			new ResponseUrl("http://test.com"),
		);

		const request = new Request(
			operation,
			new MerchantNumber("123456789"),
			new DepositFlag(DepositFlagEnum.YES),
			baseUrl,
		);

		const result = request.getRequestUrl(true);

		expect(result).toBe(baseUrl);
	});
});
