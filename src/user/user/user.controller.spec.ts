import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: []
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should can say hello", async () => {
    const response =await  controller.sayHello(
      "eko",
      "khanedy"
    );
    expect(response).toBe("Hello eko and khanedy");
  });
  it("should can say Hola", async () => {
    const response =await  controller.getHola();
    expect(response).toBe("Hola");
  });


});
