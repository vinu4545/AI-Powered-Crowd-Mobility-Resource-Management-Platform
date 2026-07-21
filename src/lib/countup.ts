import * as CountUpModule from "react-countup";

const moduleAny = CountUpModule as any;
const CountUp = moduleAny.default?.default ?? moduleAny.default ?? moduleAny;

export { CountUp };
