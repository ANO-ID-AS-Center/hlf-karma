import { Project } from '@project/common/platform/project';
import { TransportCommandAsync } from '@ts-core/common/transport';

export class ProjectAddCommand extends TransportCommandAsync<void, IProjectAddDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ProjectAddCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(ProjectAddCommand.NAME);
    }
}

export type IProjectAddDtoResponse = Project;
