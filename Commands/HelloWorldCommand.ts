import {
    IHttp,
    IMessageBuilder,
    IModify,
    IModifyCreator,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class HelloWorldCommand implements ISlashCommand {
    public command = "hello";
    public i18nDescription = "";
    public providesPreview = false;
    public i18nParamsExample = "";

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const creator: IModifyCreator = modify.getCreator();
        const sender: IUser = (await read
            .getUserReader()
            .getAppUser()) as IUser;
        const room: IRoom = context.getRoom();
        const messageTemplate: IMessage = {
            text: "Hello, World!",
            sender,
            room,
        };
        const messageBuilder: IMessageBuilder =
            creator.startMessage(messageTemplate);
        await creator.finish(messageBuilder);
    }
}
