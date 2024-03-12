import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import * as httpmock from "node-mocks-http";
import { UserService } from "./user.service";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should can say hello", async () => {
    const response = await controller.sayHello(
      "eko",
      "khanedy"
    );
    expect(response).toBe("Hello eko and khanedy");
  });
  it("should can say Hola", async () => {
    const response = await controller.getHola();
    expect(response).toBe("Hola");
  });

  it("should can view hello", async () => {
    const response = httpmock.createResponse();
    controller.viewHello("Eko", response);
    expect(response._getRenderView()).toBe("index.html");
    expect(response._getRenderData()).toEqual({
      name: "Eko",
      title: "Template Engine"
    });
  });

  it("should can say Hello 2", async () => {
    const response = await controller.sayHello2('Budi');
    expect(response).toBe("Hello Budi");
  });


});
