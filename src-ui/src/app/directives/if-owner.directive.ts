import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'
import { PaperlessUser } from '../data/paperless-user'
import { PermissionsService } from '../services/permissions.service'

@Directive({
  selector: '[ifOwner]',
})
export class IfOwnerDirective implements OnInit, OnChanges {
  // The role the user must have
  @Input()
  ifOwner: PaperlessUser

  /**
   * @param {ViewContainerRef} viewContainerRef -- The location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- The templateRef to be potentially rendered
   * @param {PermissionsService} permissionsService -- Will give us access to the permissions a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private permissionsService: PermissionsService
  ) {}

  public ngOnInit(): void {
    if (
      !this.ifOwner ||
      this.permissionsService.currentUserIsOwner(this.ifOwner)
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
    }
  }

  public ngOnChanges(): void {
    this.ngOnInit()
  }
}