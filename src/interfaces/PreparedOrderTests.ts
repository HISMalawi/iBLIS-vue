import { SpecimenType } from "./SpecimenType";
import { Test } from "./Test";

export interface PreparedOrderTests {
    test: Test;
    specimen: SpecimenType;
    reason:string;
  }