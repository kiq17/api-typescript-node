import { testServer } from "../jest.setup";


describe("Create - Test", ()=>{
    it("Criar cidade", async ()=>{
        const res1 = await testServer.post("/criar").send({nome: "Nome meu"});

        expect(res1.status).toEqual(201);
    });
});